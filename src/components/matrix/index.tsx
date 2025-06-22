import React from "react";
import { MathJax } from "better-react-mathjax";
import { Heading, HStack, StackProps, Text, VStack } from '@chakra-ui/react';
import * as math from 'mathjs';
import { JSX } from "@emotion/react/jsx-runtime";




function toTex(m: math.Matrix) {
    return `\\(\\begin{pmatrix} ${m.toArray().map(row => row.join(" & ")).join(" \\\\ ")} \\end{pmatrix}\\)`;
}



export function Matrix(props: { matrix: math.Matrix }) {
    const matrixString = toTex(props.matrix)
    return (
        <MathJax>
            {matrixString}
        </MathJax>
    )
}

export function MatrixStack({ matricies }: { matricies: math.Matrix[] } & StackProps) {
    return (
        <HStack spaceX={"2em"}>
            {matricies.map((matrix, index) => (
                <Matrix key={index} matrix={matrix} />
            ))}
        </HStack>
    )
}

export function TensorProduct({ lhs, rhs }: { lhs: math.Matrix, rhs: math.Matrix }) {
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
export function Hermation({ lhs }: { lhs: math.Matrix }) {
    return (
        <HStack spaceX={"2em"}>
            <Matrix matrix={lhs} />
            <MathJax>$$\Longrightarrow$$</MathJax>
            <Matrix matrix={math.transpose(math.conj(lhs))} />
        </HStack>
    )
}

export function HermationExplained({ lhs }: { lhs: math.Matrix }) {
    console.log("HermationExplained", lhs.toString());
    const numRows = lhs.size()[0];
    const numCols = lhs.size()[1];
    const columns = [];
    const rows = []
    for (let j = 0; j < numCols; j++) {
        // Create an index for all rows in the current column j
        const colIndex = math.index(math.range(0, numRows), j);
        // Extract the column
        const col = lhs.subset(colIndex);
        const row = math.matrix([col.toArray().flat() as number[][]]);
        columns.push(<Matrix key={j} matrix={col} />);
        rows.push(<Matrix key={j} matrix={row} />);
    }


    const herm = '\mathcal{H} \Longrightarrow \mathcal{H}^\dagger';
    return (
        <VStack spaceY={"2em"}> {/* Main vertical stack for overall page layout */}
            <Heading as={"h2"}>
                Hermation Conjugate
                <MathJax>$$ H \Longrightarrow H^\dagger $$</MathJax>
                
            </Heading>
            
            {/* Step 1: Original Matrix to Column Representation */}
            <VStack spaceY={"0.5em"} alignItems="start" w="100%">
                <Heading as="h4" size="md">
                    Step 1: Original Matrix and Column View
                </Heading>
                <HStack spaceX={"2em"}>
                    <Matrix matrix={lhs} />
                    <MathJax>$$\Longrightarrow$$</MathJax>
                    {/* '{columns}' likely represents a display or concept of the matrix's columns */}
                    {columns}
                </HStack>
            </VStack>

            {/* Step 2: From Column Representation/Original to Transpose Matrix */}
            <VStack spaceY={"0.5em"} alignItems="start" w="100%">
                <Heading as="h4" size="md">
                    Step 2: Forming the Transpose Matrix
                </Heading>
                <HStack spaceX={"2em"}>
                    {/* '{columns}' here could be the conceptual link from the previous step */}
                    {columns}
                    <MathJax>$$\Longrightarrow$$</MathJax>
                    <VStack> {/* This inner VStack was in the original structure */}
                        <Matrix matrix={math.transpose(lhs)} />
                    </VStack>
                </HStack>
            </VStack>

            {/* Step 3: From Transpose to Conjugate Transpose Matrix */}
            <VStack spaceY={"0.5em"} alignItems="start" w="100%">
                <Heading as="h4" size="md">
                    Step 3: Forming the Conjugate Transpose Matrix, Swapping the signs of the imaginary components
                </Heading>
                <HStack spaceX={"2em"}>
                    <Matrix matrix={math.transpose(lhs)} />
                    <MathJax>$$\Longrightarrow$$</MathJax>
                    <Matrix matrix={math.transpose(math.conj(lhs))} />
                </HStack>
            </VStack>
        </VStack>
    )
}