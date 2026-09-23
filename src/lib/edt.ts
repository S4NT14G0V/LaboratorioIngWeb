export function edt1d(
  f: Float32Array,
  v: Int32Array,
  z: Float32Array,
  n: number
): void {
  let k = 0;
  v[0] = 0;
  z[0] = -Infinity;
  z[1] = Infinity;
  for (let q = 1; q <= n - 1; q++) {
    let s = (f[q] + q * q - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
    while (s <= z[k]) {
      k--;
      s = (f[q] + q * q - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
    }
    k++;
    v[k] = q;
    z[k] = s;
    z[k + 1] = Infinity;
  }
  k = 0;
  for (let q = 0; q <= n - 1; q++) {
    while (z[k + 1] < q) k++;
    const d = q - v[k];
    f[q] = d * d + f[v[k]];
  }
}

export function euclideanDistanceTransform(
  mask: Uint8Array,
  width: number,
  height: number
): Float32Array {
  const inf = Infinity;
  const dist = new Float32Array(width * height);
  for (let i = 0; i < width * height; i++) dist[i] = mask[i] ? 0 : inf;

  const maxDim = Math.max(width, height);
  const f = new Float32Array(maxDim);
  const v = new Int32Array(maxDim);
  const z = new Float32Array(maxDim + 1);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) f[y] = dist[y * width + x];
    edt1d(f, v, z, height);
    for (let y = 0; y < height; y++) dist[y * width + x] = f[y];
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) f[x] = dist[y * width + x];
    edt1d(f, v, z, width);
    for (let x = 0; x < width; x++) dist[y * width + x] = Math.sqrt(f[x]);
  }
  return dist;
}

/**
 * Builds a single-channel signed distance field (positive inside) from an
 * alpha channel, in row-major order with row 0 = top of the image. This is the
 * layout used by the Canvas 2D implementation (y grows downward).
 */
export function buildSdfMap(
  alpha: Uint8Array,
  width: number,
  height: number
): Float32Array {
  const inside = new Uint8Array(width * height);
  const outsideMask = new Uint8Array(width * height);
  for (let i = 0; i < width * height; i++) {
    const isInside = alpha[i] > 128 ? 1 : 0;
    inside[i] = isInside;
    outsideMask[i] = isInside ? 0 : 1;
  }

  const dInside = euclideanDistanceTransform(inside, width, height);
  const dOutside = euclideanDistanceTransform(outsideMask, width, height);

  const out = new Float32Array(width * height);
  for (let i = 0; i < width * height; i++) {
    out[i] = dOutside[i] - dInside[i];
  }
  return out;
}
