"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
  code: string
  language: string
  filename?: string
  title?: string
}

export function CodeBlock({ code, language, filename, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const getLanguageColor = (lang: string) => {
    switch (lang.toLowerCase()) {
      case "javascript":
      case "js":
        return "#f7df1e"
      case "typescript":
      case "ts":
        return "#3178c6"
      case "jsx":
      case "tsx":
        return "#61dafb"
      case "bash":
      case "shell":
        return "#4eaa25"
      case "css":
        return "#1572b6"
      case "html":
        return "#e34f26"
      default:
        return "#888888"
    }
  }

  const highlightCode = (code: string, language: string) => {
    // Simple syntax highlighting for common patterns
    let highlighted = code

    if (language === "jsx" || language === "javascript" || language === "js") {
      // Comments
      highlighted = highlighted.replace(/(\/\/.*$)/gm, '<span class="text-[#6a9955]">$1</span>')

      // Keywords
      highlighted = highlighted.replace(
        /\b(function|const|let|var|return|import|export|from|default|if|else|for|while|class|extends|async|await|try|catch|finally)\b/g,
        '<span class="text-[#c586c0]">$1</span>',
      )

      // Strings
      highlighted = highlighted.replace(
        /(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
        '<span class="text-[#ce9178]">$1$2$3</span>',
      )

      // Numbers
      highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="text-[#b5cea8]">$1</span>')

      // JSX tags
      highlighted = highlighted.replace(/(<\/?[A-Z][a-zA-Z0-9]*)/g, '<span class="text-[#4ec9b0]">$1</span>')
      highlighted = highlighted.replace(/(<\/?[a-z][a-zA-Z0-9]*)/g, '<span class="text-[#569cd6]">$1</span>')

      // JSX attributes
      highlighted = highlighted.replace(/(\w+)=/g, '<span class="text-[#92c5f8]">$1</span>=')

      // Function names
      highlighted = highlighted.replace(
        /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,
        '<span class="text-[#dcdcaa]">$1</span>',
      )
    }

    if (language === "bash" || language === "shell") {
      // Comments
      highlighted = highlighted.replace(/(#.*$)/gm, '<span class="text-[#6a9955]">$1</span>')

      // Commands
      highlighted = highlighted.replace(/^([a-zA-Z-]+)/gm, '<span class="text-[#9cdcfe]">$1</span>')
    }

    return highlighted
  }

  return (
    <div className="my-6 rounded-lg border bg-[#1e1e1e] shadow-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-[#2d2d30] border-b border-[#3e3e42]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#28ca42]"></div>
          </div>
          {filename && <span className="text-sm font-medium text-[#cccccc] ml-2">{filename}</span>}
        </div>
        <div className="flex items-center gap-2">
          {title && <span className="text-xs text-[#888888]">{title}</span>}
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getLanguageColor(language) }}></div>
            <span className="text-xs text-[#888888] capitalize">{language}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-6 w-6 p-0 text-[#cccccc] hover:text-white hover:bg-[#3e3e42]"
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          </Button>
        </div>
      </div>
      <pre className="p-4 overflow-x-auto bg-[#1e1e1e] text-[#d4d4d4]">
        <code
          className="text-sm font-mono leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
        />
      </pre>
    </div>
  )
}
