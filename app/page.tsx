"use client"
import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [msg, setMsg] = useState("")

  async function makeVideo() {
    const { error } = await supabase.from("videos").insert([{ title: prompt, prompt: prompt }])
    if (error) setMsg("Error: " + error.message)
    else setMsg("Saved! Your video is ready in table.")
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Simple Video Maker</h1>
      <input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="e.g. A cat dancing in Port Moresby" style={{ width: "100%", padding: 12 }} />
      <button onClick={makeVideo} style={{ marginTop: 10, padding: "12px 20px", background: "black", color: "white" }}>Make Video</button>
      <p>{msg}</p>
    </div>
  )
}
