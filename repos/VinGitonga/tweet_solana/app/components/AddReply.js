import {
    Box,
    Flex,
    Image,
    Input,
    Button,
} from "@chakra-ui/react"
import { useState } from "react"

const AddReply = ({ userName, saveComment }) => {
    const [comment, setComment] = useState("")

    const handleReplyClick = async () => {
        await saveComment(comment)
        setComment("")
    }

    return (
        <Box my={4} ml={4} >
            <Flex alignItems="center">
                <Image
                    h={10}
                    fit="cover"
                    rounded="full"
                    src={`https://avatars.dicebear.com/api/adventurer/${userName.toLowerCase().replaceAll(" ", "")}.svg`}
                    alt="Avatar"
                />
                <Input 
                    mx={2} 
                    color={"gray.700"} 
                    variant="flushed" 
                    placeholder="Tweet your Reply" 
                    fontSize={"md"} size={'lg'} 
                    value={comment} 
                    onChange={e => setComment(e.target.value)} 
                />
                <Button variant="solid" colorScheme={"messenger"} borderRadius={'lg'} onClick={handleReplyClick} >
                    Reply
                </Button>
            </Flex>
        </Box>
    )
}

export default AddReply;