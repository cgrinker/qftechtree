import * as math from 'mathjs';


const i = math.evaluate("i");
const ni = math.evaluate("-i");

export const pauli_x = math.matrix([
    [0, 1],
    [1, 0]
])

export const pauli_y = math.matrix([
    [0, ni],
    [i, 0]
])

export const pauli_z =  math.matrix([
    [1, 0],
    [0, -1]
])

export const gamma0 = math.matrix([
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, -1, 0],
  [0, 0, 0, -1]
]);

export const gamma1 = math.matrix([
  [0, 0, 0, 1],
  [0, 0, 1, 0],
  [0, -1, 0, 0],
  [-1, 0, 0, 0]
]);

export const gamma2 = math.matrix([
  [0,  0,  0, ni], 
  [0,  0,  i, 0],  
  [0, i,  0,  0],  
  [ni, 0,  0,  0]
]);

export const gamma3 = math.matrix([
  [0,  0,  1,  0],
  [0,  0,  0, -1],
  [-1, 0,  0,  0],
  [0,  1,  0,  0]
]);