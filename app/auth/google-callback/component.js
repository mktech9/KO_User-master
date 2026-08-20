"use client";

import { CreateUser, SetSession } from "@/libs/manage-user";
import { Center, Loader, Stack, Text } from "@mantine/core";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const GoogleAuth = () => {
  async function getUserInfo(accessToken) {
    const res = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (res.status !== 200) {
      throw new Error("Failed to fetch user info");
    }

    const userInfo = await res.json();
    return userInfo;
  }

  const loginHandler = async (accessToken) => {
    try {
      const userInfo = await getUserInfo(accessToken);
      console.log(userInfo);

      const result = await CreateUser({
        name: userInfo.name,
        email: userInfo.email,
      });

      if (!result.success) {
        throw new Error(result?.err);
      }
      await SetSession(result.user);
    } catch (err) {
      console.log(err);
      redirect("/auth");
    }
  };

  useEffect(() => {
    const pathname = typeof window !== "undefined" ? window.location : "";
    let url = pathname.href;
    const accessToken = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];

    loginHandler(accessToken);
  }, []);

  return (
    <>
      <Center h={390}>
        <Stack align="center">
          <Loader type="dots" />
          <Text fw={500} size="sm">
            Just a moment...
          </Text>
        </Stack>
      </Center>
    </>
  );
};

export default GoogleAuth;
