import { Document } from "@contentful/rich-text-types";
import { Box, Prose } from "../global/matic-ds";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface EvalItemProps {
    field: string;
    score: number;
    desc: {
        json: Document;
    }
}

const options = {
    renderNode: {
        'paragraph': (node: any) => {
            return (
                <p style={{ margin: '1em 0' }}>
                    {node.content.map((content: any) => {
                        if (content.nodeType === 'text') {
                            // Split the text by newline characters and render with <br />
                            return content.value.split('\n').map((line: string, index: number) => (
                                <span key={index}>{line}<br /></span>
                            ));
                        }
                        return null;
                    })}
                </p>
            );
        },
        // Add other node types as needed
    },
};

export default function EvalItem({ field, score, desc }: EvalItemProps) {
    return (
        <Box direction="col" className="">
            <Box direction="row" className="justify-between">
                <h4 className="">{field}</h4>
                <p className="text-3xl font-light">{score}</p>
            </Box>
            {desc?.json ? (
                <Prose className="">{documentToReactComponents(desc.json, options)}</Prose>
            ) : (
                <p>No description available.</p>
            )}
        </Box>
    )
}