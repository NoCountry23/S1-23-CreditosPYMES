import ProfileClient from "@/components/ProfileClient";
import ProfileOperator from "@/components/ProfileOperator";
import { createClient } from "@/lib/supabase/server";
import React from "react";

export default async function page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user?.user_metadata.role === "operator") {
    return <ProfileOperator />;
  }
  if (user?.user_metadata.role === "representante") {
    return <ProfileClient />;
  }
}
