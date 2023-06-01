import type { V2_MetaFunction } from "@remix-run/node";
import { Button } from "components/ui/button";
import { TypeOf, boolean, z } from "zod";
import FSidebar from "./fbsidebar";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Profile" }];
};

export default function Index() {

  return (
    <div>Profile</div>
  );
}