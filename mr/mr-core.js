import * as THREE from 'three';

const finite = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const validVector = value => value && ['x','y','z'].every(axis => Number.isFinite(value[axis]));
const validNormal = value => validVector(value) && value.lengthSq() > 1e-8;

export function clamp(value, min, max) { return Math.min(max, Math.max(min, finite(value, min))); }
export function resolveOrientation(normal, configured = 'auto') {
  if (configured === 'horizontal' || configured === 'vertical') return configured;
  return Math.abs(normal.dot(new THREE.Vector3(0,1,0))) > 0.72 ? 'horizontal' : 'vertical';
}
export function orthogonalInPlane(seed, normal) {
  const unit = normal.clone().normalize();
  let vector = seed.clone().addScaledVector(unit,-seed.dot(unit));
  if (vector.lengthSq() < 0.0001) {
    const axis=['x','y','z'].sort((a,b)=>Math.abs(unit[a])-Math.abs(unit[b]))[0];
    vector=new THREE.Vector3(); vector[axis]=1; vector.addScaledVector(unit,-vector.dot(unit));
  }
  return vector.normalize();
}
export function frontSignForBasis(zAxis, center, viewerPosition) { return zAxis.dot(viewerPosition.clone().sub(center)) >= 0 ? 1 : -1; }
export function buildThreePointCalibration(points, firstHit, mr, viewerPosition) {
  if (!Array.isArray(points)||points.length!==3||!points.every(validVector)||!validNormal(firstHit?.normal)||!validVector(viewerPosition)) return null;
  const [topLeft,topRight,bottomLeft]=points; const xAxis=topRight.clone().sub(topLeft); const width=xAxis.length();
  if(width<0.04||width>8)return null; xAxis.normalize();
  const down=bottomLeft.clone().sub(topLeft); if(Math.abs(down.dot(xAxis))>down.length()*.35)return null;
  const downInPlane=down.clone().sub(xAxis.clone().multiplyScalar(down.dot(xAxis))); const height=downInPlane.length();
  if(height<0.04||height>8)return null;
  const yAxis=downInPlane.normalize().multiplyScalar(-1); const zAxis=new THREE.Vector3().crossVectors(xAxis,yAxis).normalize();
  const center=topLeft.clone().add(xAxis.clone().multiplyScalar(width/2)).add(yAxis.clone().multiplyScalar(-height/2));
  return {mode:'three_point',matrix:new THREE.Matrix4().makeBasis(xAxis,yAxis,zAxis).setPosition(center),width,height,frontSign:frontSignForBasis(zAxis,center,viewerPosition),surfaceNormal:firstHit.normal.clone()};
}
export function buildTwoPointCalibration(points, firstHit, mr, viewerPosition) {
  if(!Array.isArray(points)||points.length!==2||!points.every(validVector)||!validNormal(firstHit?.normal)||!validVector(viewerPosition))return null;
  const [topLeft,topRight]=points; const xAxis=topRight.clone().sub(topLeft); const width=xAxis.length(); if(width<0.04||width>8)return null; xAxis.normalize();
  const topCenter=topLeft.clone().add(topRight).multiplyScalar(.5); const normal=firstHit.normal.clone().normalize(); const orientation=resolveOrientation(normal,mr?.surface_orientation); let yAxis;
  if(orientation==='horizontal'){const towardViewer=viewerPosition.clone().sub(topCenter);towardViewer.addScaledVector(normal,-towardViewer.dot(normal));yAxis=towardViewer.lengthSq()<.0001?new THREE.Vector3().crossVectors(normal,xAxis):towardViewer.normalize().multiplyScalar(-1);yAxis.addScaledVector(xAxis,-yAxis.dot(xAxis)).normalize();}
  else{const worldUp=new THREE.Vector3(0,1,0);yAxis=worldUp.clone().addScaledVector(normal,-worldUp.dot(normal));if(yAxis.lengthSq()<.0001)yAxis=new THREE.Vector3().crossVectors(normal,xAxis);yAxis.addScaledVector(xAxis,-yAxis.dot(xAxis)).normalize();if(yAxis.dot(worldUp)<0)yAxis.negate();}
  if(yAxis.lengthSq()<.0001)yAxis.crossVectors(normal,xAxis).normalize(); if(yAxis.lengthSq()<.0001)return null;
  const zAxis=new THREE.Vector3().crossVectors(xAxis,yAxis).normalize(); const height=clamp(mr?.physical_height_m??.3,.05,8); const center=topCenter.clone().add(yAxis.clone().multiplyScalar(-height/2));
  return {mode:'two_point',matrix:new THREE.Matrix4().makeBasis(xAxis,yAxis,zAxis).setPosition(center),width,height,frontSign:frontSignForBasis(zAxis,center,viewerPosition),surfaceNormal:normal};
}
export function mapOverlayToReferenceRoi(overlay,roi){if(!roi)return{...overlay};const width=clamp(roi.w??100,1,100),height=clamp(roi.h??100,1,100),left=finite(roi.x,50)-width/2,top=finite(roi.y,50)-height/2;return{...overlay,x:(finite(overlay.x,50)-left)/width*100,y:(finite(overlay.y,50)-top)/height*100,w:finite(overlay.w,0)/width*100,h:finite(overlay.h,0)/height*100};}
export function pointInsideCalibratedSurface(localPoint,calibration,padding=.02){if(!localPoint||!calibration)return false;const halfWidth=finite(calibration.width)/2+padding,halfHeight=finite(calibration.height)/2+padding;return Math.abs(localPoint.x)<=halfWidth&&Math.abs(localPoint.y)<=halfHeight;}
