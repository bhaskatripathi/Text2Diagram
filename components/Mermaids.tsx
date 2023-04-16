"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Copy, Palette } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Theme } from "@/types/type";

interface MermaidProps {
  chart: string;
}

const Available_Themes: Theme[] = [
  "default",
];

export function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string>("Download Diagram");
  const [theme, setTheme] = useState<Theme | "">("");

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setTheme(theme as Theme);
    } else {
      setTheme("default");
      localStorage.setItem("theme", "default");
    }
  }, []);

  const copyToClipboard = (text: string) => {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const handleCopyClick = () => {
    const container = ref.current;
    if (!container) return;

    const svgElement = container.querySelector("svg");
    if (svgElement) {
      const svgCode = svgElement.outerHTML;
      copyToClipboard(svgCode);
      setLabel("Copied!");

      setTimeout(() => {
        setLabel("Copy SVG");
      }, 1000);
    }
  };

  const downloadSVG = () => {
    const container = ref.current;
    if (!container) return;
  
    const svgElement = container.querySelector("svg");
    if (svgElement) {
      const svgCode = svgElement.outerHTML;
      const blob = new Blob([svgCode], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "diagram.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  async function drawChart(chart: string, theme: Theme | "") {
    const container = ref.current;
    if (chart !== "" && container && theme !== "") {
      container.removeAttribute("data-processed");
      mermaid.mermaidAPI.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme,
        logLevel: 5,
      });
      await mermaid.run();
    }
  }

  useEffect(() => {
    drawChart(chart, theme);
  }, [chart]);

  const handleThemeChange = async (value: Theme) => {
    setTheme(value);
    localStorage.setItem("theme", value);

    // rerender chart
    const container = ref.current;
    if (container) {
      container.removeAttribute("data-processed");
      mermaid.mermaidAPI.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme: value,
        logLevel: 5,
      });
      const { svg } = await mermaid.mermaidAPI.render("id", chart);
      ref.current.innerHTML = svg;
    }
  };

  return (
    <div className="w-full">
      <div className="absolute right-0 px-4 py-2 text-xs font-sans flex items-center justify-center">
        <Select value={theme} onValueChange={handleThemeChange}>
          <SelectTrigger className="w-[180px] mr-2 h-8">
            <Palette className="h-4 w-4" />
            <SelectValue id="model" placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            {Available_Themes.map((theme) => {
              return (
                <SelectItem key={theme} value={theme}>
                  {theme}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <button className="flex ml-auto gap-2" onClick={downloadSVG}>
          <Copy className="mr-2 h-4 w-4" />
          {label}
        </button>
      </div>
      <div ref={ref} className="mermaid flex items-center justify-center mt-12">
        {chart}
      </div>
    </div>
  );
}
