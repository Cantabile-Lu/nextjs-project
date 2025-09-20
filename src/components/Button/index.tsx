"use client";
import { Tabs, Tab } from "@heroui/react";
export default () => {
    return (
        <>
            <Tabs key={"full"} aria-label="Tabs radius" radius={"full"}>
                <Tab key="photos" title="Photos" />
                <Tab key="music" title="Music" />
                <Tab key="videos" title="Videos" />
            </Tabs>
        </>
    );
};
