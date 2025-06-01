import React from "react";
import { MathJax } from "better-react-mathjax";
import {HStack, StackProps, Text} from '@chakra-ui/react';
import * as math from 'mathjs';
import { JSX } from "@emotion/react/jsx-runtime";




function toTex(m: math.Matrix) {
    return `\\(\\begin{pmatrix} ${m.toArray().map(row => row.join(" & ")).join(" \\\\ ")} \\end{pmatrix}\\)`;
}




export function Matrix(props: {matrix: math.Matrix}) {
    const matrixString = toTex(props.matrix)
    return (
        <MathJax>
            {matrixString}
        </MathJax>
    )
}

export function MatrixStack({matricies}: {matricies: math.Matrix[]}& StackProps) {
    return (
        <HStack spaceX={"2em"}>
            {matricies.map((matrix, index) => (
                <Matrix key={index} matrix={matrix} />
            ))}
        </HStack>
    )
}

export function TensorProduct({lhs, rhs}: {lhs: math.Matrix, rhs: math.Matrix}) {
    return (
        <HStack spaceX={"2em"}>
            <Matrix matrix={lhs} />
            <MathJax>$$\otimes$$</MathJax>
            <Matrix matrix={lhs} />
            <MathJax>=</MathJax>
            <Matrix matrix={math.kron(lhs, rhs)} />
        </HStack>
    )
}


//tsignore
export function Hermation({lhs}: {lhs: math.Matrix}) {
    return (
        <HStack spaceX={"2em"}>
            <Matrix matrix={lhs} />
            <MathJax>$$\Longrightarrow$$</MathJax>
            <Matrix matrix={math.transpose(math.conj(lhs))} />
        </HStack>
    )
}