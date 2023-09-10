import { Matrix4 } from './matrix4';


export function createOrthographicMatrix4(
  left: number,
  right: number,
  top: number,
  bottom: number,
  near: number,
  far: number
): Matrix4 {
  const sx =  2 / (right - left);
  const sy =  2 / (top - bottom);
  const sz = -2 / (far - near);

  const tx = -(left + right) / (left - right);
  const ty = -(bottom + top) / (bottom - top);
  const tz = -(near + far) / (near - far);

  return new Matrix4(
    sx , 0  , 0  , 0  ,
    0  , sy , 0  , 0  ,
    0  , 0  , sz , 0  ,
    tx , ty , tz , 1
  );
}

// export function createPerspectiveMatrix4(fov: number, near: number, far: number): Matrix4 {
//   const s = 1 / Math.tan(fov * 0.5 * Math.PI / 180.0);
//   const sz = -far / (far - near);
//   const tz = -far * near / (far - near);
//
//   return new Matrix4(
//     s  , 0  , 0  ,  0 ,
//     0  , s  , 0  ,  0 ,
//     0  , 0  , sz , -1 ,
//     0  , 0  , tz ,  0
//   );
// }
