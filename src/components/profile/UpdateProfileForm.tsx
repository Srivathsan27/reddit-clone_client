import {
  RadioGroup,
  Stack,
  Radio,
  Text,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { FC, useState } from "react";
import { useUpdateProfileMutation } from "../../generated/graphql";
import { Gender } from "../../types/gender";
import FormInput from "../FormInput";

interface UpdateProfileFormProps {
  name: string;
  bio: string;
  sex: Gender;
  userId: number;
}

const UpdateProfileForm: FC<UpdateProfileFormProps> = ({
  name,
  bio,
  sex,
  userId: id,
}) => {
  const [value, setValue] = useState<string>(sex);

  const [, updateProfile] = useUpdateProfileMutation();
  const toast = useToast();

  return (
    <Formik
      initialValues={{
        name,
        bio,
        sex,
      }}
      onSubmit={async (values) => {
        console.log("values: ", values);
        const { data, error } = await updateProfile({
          id,
          values,
        });
        if (error || data?.updateProfile.error) {
          console.log("resp err: ", error);
          console.log("error : ", data?.updateProfile.error);
          if (data?.updateProfile.error?.field === "current user") {
            toast({
              duration: 5000,
              description: "User not authorized to update profile!",
              isClosable: true,
              status: "error",
              position: "bottom-left",
              title: "Update Failed!",
              variant: "solid",
            });
            return;
          }
          toast({
            duration: 5000,
            description: "Could not update profile!",
            isClosable: true,
            status: "error",
            position: "bottom-left",
            title: "Update Failed!",
            variant: "solid",
          });
        } else {
          toast({
            duration: 5000,
            description: "Updated Profile Successfully!",
            isClosable: true,
            status: "success",
            position: "bottom-left",
            title: "Updated Profile!",
            variant: "solid",
          });
        }
      }}
    >
      {({ isSubmitting, setFieldValue }) => {
        return (
          <Form>
            <FormInput
              name="name"
              label="Your name"
              color="white"
              labelColor="white"
              boxProps={{
                mt: 3,
              }}
            />

            <FormInput
              name="bio"
              label="A little something about yourself..."
              inputType="textarea"
              color="white"
              labelColor="white"
              boxProps={{
                mt: 4,
              }}
            />

            <Text mt={4} mb={2} color="white" ml={1}>
              Gender
            </Text>
            <RadioGroup
              ml={4}
              color="white"
              onChange={setValue}
              value={value}
              name="sex"
            >
              <Stack direction="row">
                <Radio
                  value="male"
                  color="white"
                  onClick={() => setFieldValue("sex", "male")}
                >
                  M
                </Radio>
                <Radio
                  value="female"
                  color="white"
                  onClick={() => setFieldValue("sex", "female")}
                >
                  F
                </Radio>
              </Stack>
            </RadioGroup>

            <Flex w="100%" justify="flex-end" align="center">
              <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
                Submit
              </Button>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UpdateProfileForm;
