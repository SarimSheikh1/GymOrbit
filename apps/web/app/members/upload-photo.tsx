"use client";
import { useState } from "react";
export function UploadPhoto({ memberId }: { memberId: string }) { const [message, setMessage] = useState(""); async function upload(form: FormData) { const response = await fetch(`/api/members/${memberId}/photo`, { method: "POST", body: form }); setMessage(response.ok ? "Photo saved" : "Upload failed"); } return <form action={upload}><input aria-label="Upload member photo" name="photo" type="file" accept="image/png,image/jpeg" onChange={(event) => event.currentTarget.form?.requestSubmit()} /><small>{message}</small></form>; }
