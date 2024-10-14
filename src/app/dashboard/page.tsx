"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaPlay, FaPlus } from "react-icons/fa";
import { Button } from "~/components/ui/button";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState({});

  const session = useSession();

  // console.log(session.data?.user.name);

  return (
    <div className="flex flex-col bg-black lg:flex-row">
      <main className="flex-1 overflow-auto p-4 md:p-8">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          Welcome back, {session.data?.user.name}!
        </h2>

        {/* Recent Videos */}
        {/* <div className="mt-8">
          <h3 className="text-lg font-semibold text-white md:text-xl">
            Recent Videos
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg bg-white p-4 shadow">
                <div className="h-24 w-full rounded-md bg-black md:h-32"></div>
                <h4 className="mt-2 font-semibold"> Demo Video Title {i}</h4>
                <p className="text-sm text-black">
                  Generated on {new Date().toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Create New Video */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-100 md:text-xl">
            Create New Video
          </h3>
          {/* <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <Textarea
              placeholder="Describe your video idea..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="h-24 w-full text-white md:h-32"
            />
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={loading}
            >
              <FaPlus className="mr-2 h-4 w-4" />
              {loading ? "Generating..." : "Generate Video"}
            </Button>
          </form> */}
        </div>

        {/* Generated Video */}
        {video && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-700 md:text-xl">
              Generated Video
            </h3>
            <div className="mt-4 rounded-lg bg-white p-4 shadow">
              <div className="h-24 w-full rounded-md bg-black md:h-32">
                {/* <video src={video} controls className="h-full w-full"></video> */}
              </div>
              {/* <h4 className="mt-2 font-semibold"> </h4> */}
              <p className="text-sm text-black">
                Generated on {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        )}

        {/* Video Templates */}
        {/* <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-700 md:text-xl">
            Video Templates
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["Explainer", "Product Demo", "Tutorial"].map((template) => (
              <div key={template} className="rounded-lg bg-white p-4 shadow">
                <h4 className="font-semibold">{template}</h4>
                <p className="mt-1 text-sm text-gray-600">
                  Quick {template.toLowerCase()} video template
                </p>
                <Button variant="outline" className="mt-4 w-full sm:w-auto">
                  <FaPlay className="mr-2 h-4 w-4" />
                  Use Template
                </Button>
              </div>
            ))}
          </div>
        </div> */}
      </main>
    </div>
  );
}
