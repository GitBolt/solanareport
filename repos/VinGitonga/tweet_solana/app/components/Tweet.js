import { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Image,
    Link,
    chakra,
    IconButton,
} from "@chakra-ui/react";
import { BiMessageRounded } from "react-icons/bi"
import { BsHeart } from "react-icons/bs"
import { FaRetweet } from "react-icons/fa"
import { FiShare } from "react-icons/fi"
import AddReply from './AddReply';
import TweetComment from "./TweetComment"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en.json"


TimeAgo.addDefaultLocale(en)

const timeAgo = new TimeAgo("en-US")

const Tweet = ({ tweetDetail, userName, createComment, getTweetComments }) => {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState(false)

    const handleReplyClick = () => setShowReplyInput(!showReplyInput);

    const saveComment = comment => createComment(tweetDetail.tweetIndex, tweetDetail.tweetCommentCount, comment)

    const getComments = async () => {
        let commentsTweet = await getTweetComments(tweetDetail.tweetIndex, tweetDetail.tweetCommentCount)
        setComments(commentsTweet)
        if (comments?.length > 0){
            setShowComments(true)
            console.log(showComments)
        }
    }



    return (
        <Box mt={8}>
            <Flex alignItems="center">
                <Flex alignItems="center">
                    <Image
                        h={10}
                        fit="cover"
                        rounded="full"
                        src={`https://avatars.dicebear.com/api/adventurer/${tweetDetail.tweetAuthor.toLowerCase().replaceAll(" ", "")}.svg`}
                        alt="Avatar"
                    />
                    <Link
                        mx={2}
                        fontWeight="bold"
                        color="gray.700"
                        _dark={{
                            color: "gray.200",
                        }}
                    >
                        {tweetDetail.tweetAuthor}
                    </Link>
                </Flex>
                <chakra.span
                    mx={1}
                    fontSize="sm"
                    color="gray.600"
                    _dark={{
                        color: "gray.300",
                    }}
                >
                    {timeAgo.format(new Date(tweetDetail.tweetTime * 1000), "twitter-now")}
                </chakra.span>
            </Flex>
            <chakra.p
                mt={2}
                fontSize="sm"
                color="gray.600"
                _dark={{
                    color: "gray.400",
                }}
            >
                {tweetDetail.tweetContent}
            </chakra.p>
            <Flex alignItems="center" my={4} justifyContent={'space-between'}>
                <IconButton
                    variant='ghost'
                    colorScheme='teal'
                    aria-label='Reply'
                    icon={<BiMessageRounded />}
                    fontSize='20px'
                    borderRadius={'full'}
                    onClick={handleReplyClick}
                />
                <IconButton
                    variant='ghost'
                    colorScheme='teal'
                    aria-label='Retweet'
                    icon={<FaRetweet />}
                    fontSize='20px'
                    borderRadius={'full'}
                />
                <IconButton
                    variant='ghost'
                    colorScheme='teal'
                    aria-label='Like'
                    icon={<BsHeart />}
                    fontSize='20px'
                    borderRadius={'full'}
                    onClick={getComments}
                />
                <IconButton
                    variant='ghost'
                    colorScheme='teal'
                    // aria-label='Share'
                    icon={<FiShare />}
                    fontSize='20px'
                    borderRadius={'full'}
                />
            </Flex>
            {showReplyInput && <AddReply userName={userName} saveComment={saveComment} />}
            {showComments && (
                comments?.map(comment => <TweetComment commentDetail={comment} key={comment?.commentIndex} />)
            )}
            <hr style={{ backgroundColor: "#cbd5e0", color: "#cbd5e0", height: 2 }} />
        </Box>
    )
}

export default Tweet