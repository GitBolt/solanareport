import { useState } from "react";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    InputGroup,
    InputLeftElement,
    Icon,
} from "@chakra-ui/react";
import { RiLoginCircleFill } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { FiUser } from "react-icons/fi";

export default function Signup({ signup }) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => signup(name, email)

    
    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontFamily={"Poppins"}
        >
            <Stack spacing={8} mx={"auto"} w={"450px"}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Welcome </Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        Create an Account
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Name</FormLabel>
                            <InputGroup>
                                <InputLeftElement>
                                    <Icon as={FiUser} w={4} h={4} />
                                </InputLeftElement>
                                <Input
                                    variant={"flushed"}
                                    color={"gray.500"}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder={"Riley Davis"}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <InputGroup>
                                <InputLeftElement>
                                    <Icon as={HiOutlineMail} w={4} h={4} />
                                </InputLeftElement>
                                <Input
                                    type="email"
                                    variant={"flushed"}
                                    color={"gray.500"}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={"riley@outlook.com"}
                                />
                            </InputGroup>
                        </FormControl>
                        
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: "column", sm: "row" }}
                                align={"start"}
                                justify={"space-between"}
                            >
                                <Checkbox>Remember me</Checkbox>
                                <Link color={"blue.400"}>Forgot password?</Link>
                            </Stack>
                            <Button
                                bg={"blue.400"}
                                color={"white"}
                                leftIcon={<RiLoginCircleFill />}
                                isLoading={loading}
                                loadingText={"Saving ..."}
                                _hover={{
                                    bg: "blue.500",
                                }}
                                onClick={handleSubmit}
                            >
                                Sign in
                            </Button>
                            <Link
                                color={"blue.400"}
                            >
                                {" "}
                                Don&apos;t have an account? Register
                            </Link>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}