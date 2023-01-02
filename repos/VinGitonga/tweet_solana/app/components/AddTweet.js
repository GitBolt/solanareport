import {
    Box,
    Flex,
    Image,
    Input,
    Badge,
    Button
} from "@chakra-ui/react"


const AddTweet = ({ tweetContent, setTweetContent, sendTweet, userName }) => {
    return (
        <Box mt={4} mb={7} >
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
                    placeholder="What's happening?" 
                    size={'lg'} 
                    onChange={e => setTweetContent(e.target.value)}
                    value={tweetContent}
                />
            </Flex>
            <Flex alignItems="center" justifyContent={"space-between"} mt={3}>
                <Badge colorScheme="teal" variant="subtle" size={'md'}>
                    #tweetSolana
                </Badge>
                <Button variant="solid" colorScheme={"pink"} borderRadius={'lg'} onClick={sendTweet} >
                    Tweet
                </Button>
            </Flex>
        </Box>
    )
}

export default AddTweet