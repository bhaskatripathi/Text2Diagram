"use client";

import { useAtom } from "jotai";
import { type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { apiKeyAtom, modelAtom } from "@/lib/atom";
import type { OpenAIModel } from "@/types/type";

export const APIKeyInput = () => {
  const [apiKey, setApiKey] = useAtom(apiKeyAtom);
  const [model, setModel] = useAtom(modelAtom);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setApiKey(e.target.value);

  const handleModelChange = (value: OpenAIModel) => {
    setModel(value);
  };

  const handleSave = () => {
    localStorage.setItem("apiKey", apiKey);
    localStorage.setItem("model", model);
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <div>
        <Label htmlFor="api-key">OpenAI API key</Label>
        <Input
          type="password"
          id="api-key"
          placeholder="OpenAI API Key"
          value={apiKey}
          onChange={handleChange}
          className="mt-2"
        />
      </div>

      <div className="mb-2">
        <Label htmlFor="model">OpenAI model</Label>
        <Select value={model} onValueChange={handleModelChange}>
          <SelectTrigger className="w-[180px] mt-2">
            <SelectValue id="model" placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt-4">gpt-4</SelectItem>
            <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};
