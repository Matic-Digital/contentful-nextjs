import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Box, Container, Prose } from "../global/matic-ds";
import { Button } from "../ui/button";
import Link from "next/link";
import { Document } from "@contentful/rich-text-types";

interface ProfileNotesProps {
    type: string;
    notes: { json: Document; } | undefined;
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

export default function ProfileNotes({ type, notes }: ProfileNotesProps) {
    return (
        <Container>
            <Box direction={{ base: 'col', md: 'row' }} className="p-4 md:p-8 shadow-lg rounded-lg bg-white">
                <Box direction="col" gap={4} className="p-4 w-[239px] md:min-w-[272px] max-w-[30rem] shadow-lg rounded-lg bg-[#000227] text-white items-center justify-center">
                  <h1 className="">Next <span className={` ${type === 'Design' ? 'text-design-purple' : type === 'Engineering' ? 'text-engineering-blue' : ''} `}>Steps</span></h1>
                  <p className="text-white text-center">Look like a good fit? Get started by scheduling an intro meeting today.</p>
                  <Button className={`
                     text-white rounded-lg mb-2
                     ${type === 'Design' ? 'bg-design-purple' : type === 'Engineering' ? 'bg-engineering-blue' : type === 'Management' ? 'bg-management-red' : ''}
                    `}>Schedule Introduction</Button>
                  <p className="text-white">Questions? <Link href="mailto:hello@maticteams.com" className="text-white font-bold">Get in touch</Link></p>
                </Box>
              <Box direction='col' className='mx-auto'>
                <p className="uppercase font-bold text-[#a4a7ae] text-[10px] md:text-[12px]">Notes</p>
                <Prose className="">
                    {notes?.json ? documentToReactComponents(notes.json, options) : <p>No notes available.</p>}
                </Prose>
                <p className="font-bold">Stilian @ Matic Teams</p>
              </Box>
            </Box>
        </Container>
    );
}   