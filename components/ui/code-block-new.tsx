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

// Token types for syntax highlighting
type TokenType = 
  | 'keyword' 
  | 'string' 
  | 'comment' 
  | 'number' 
  | 'jsx-tag' 
  | 'jsx-attribute' 
  | 'function' 
  | 'variable' 
  | 'operator' 
  | 'punctuation' 
  | 'text'

interface Token {
  type: TokenType
  value: string
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

  // Simple tokenizer for JavaScript/JSX
  const tokenizeCode = (code: string, language: string): Token[] => {
    if (!['javascript', 'js', 'jsx', 'tsx', 'typescript', 'ts'].includes(language.toLowerCase())) {
      return [{ type: 'text', value: code }]
    }

    const tokens: Token[] = []
    const keywords = [
      'function', 'const', 'let', 'var', 'return', 'import', 'export', 'from', 'default',
      'if', 'else', 'for', 'while', 'class', 'extends', 'async', 'await', 'try', 'catch',
      'finally', 'true', 'false', 'null', 'undefined', 'typeof', 'instanceof', 'new',
      'this', 'super', 'switch', 'case', 'break', 'continue', 'do', 'throw'
    ]

    // Split by lines to preserve formatting
    const lines = code.split('\n')
    
    lines.forEach((line, lineIndex) => {
      if (lineIndex > 0) {
        tokens.push({ type: 'text', value: '\n' })
      }

      let i = 0
      while (i < line.length) {
        const char = line[i]
        const remaining = line.slice(i)

        // Skip whitespace
        if (/\s/.test(char)) {
          tokens.push({ type: 'text', value: char })
          i++
          continue
        }

        // Comments
        if (remaining.startsWith('//')) {
          const commentEnd = line.length
          tokens.push({ type: 'comment', value: line.slice(i, commentEnd) })
          i = commentEnd
          continue
        }

        if (remaining.startsWith('/*')) {
          // Handle multi-line comments - for now, treat as single line
          const commentEnd = remaining.indexOf('*/') + 2
          if (commentEnd > 1) {
            tokens.push({ type: 'comment', value: remaining.slice(0, commentEnd) })
            i += commentEnd
          } else {
            tokens.push({ type: 'comment', value: remaining })
            i = line.length
          }
          continue
        }

        // Strings
        if (char === '"' || char === "'" || char === '`') {
          const quote = char
          let stringEnd = i + 1
          let escaped = false
          
          while (stringEnd < line.length) {
            if (escaped) {
              escaped = false
            } else if (line[stringEnd] === '\\') {
              escaped = true
            } else if (line[stringEnd] === quote) {
              stringEnd++
              break
            }
            stringEnd++
          }
          
          tokens.push({ type: 'string', value: line.slice(i, stringEnd) })
          i = stringEnd
          continue
        }

        // Numbers
        if (/\d/.test(char)) {
          let numEnd = i
          while (numEnd < line.length && /[\d.]/.test(line[numEnd])) {
            numEnd++
          }
          tokens.push({ type: 'number', value: line.slice(i, numEnd) })
          i = numEnd
          continue
        }

        // JSX tags
        if (char === '<') {
          const tagMatch = remaining.match(/^<\/?[a-zA-Z][a-zA-Z0-9]*/)
          if (tagMatch) {
            tokens.push({ type: 'jsx-tag', value: tagMatch[0] })
            i += tagMatch[0].length
            continue
          }
        }

        // JSX closing bracket
        if (char === '>' && tokens.length > 0 && tokens[tokens.length - 1].type === 'jsx-tag') {
          tokens.push({ type: 'jsx-tag', value: '>' })
          i++
          continue
        }

        // Operators and punctuation
        if (/[+\-*/%=!<>&|^~?:;,(){}[\]]/.test(char)) {
          // Handle multi-character operators
          const twoChar = remaining.slice(0, 2)
          if (['==', '!=', '<=', '>=', '&&', '||', '++', '--', '=>', '...'].includes(twoChar)) {
            tokens.push({ type: 'operator', value: twoChar })
            i += 2
          } else {
            tokens.push({ type: 'punctuation', value: char })
            i++
          }
          continue
        }

        // Identifiers (keywords, functions, variables)
        if (/[a-zA-Z_$]/.test(char)) {
          let identEnd = i
          while (identEnd < line.length && /[a-zA-Z0-9_$]/.test(line[identEnd])) {
            identEnd++
          }
          
          const identifier = line.slice(i, identEnd)
          
          // Check if it's a keyword
          if (keywords.includes(identifier)) {
            tokens.push({ type: 'keyword', value: identifier })
          } else {
            // Check if it's followed by parentheses (function call)
            const nextNonSpace = remaining.slice(identifier.length).match(/^\s*\(/);
            if (nextNonSpace) {
              tokens.push({ type: 'function', value: identifier })
            } else {
              tokens.push({ type: 'variable', value: identifier })
            }
          }
          
          i = identEnd
          continue
        }

        // Default: treat as text
        tokens.push({ type: 'text', value: char })
        i++
      }
    })

    return tokens
  }

  const getTokenColor = (type: TokenType): string => {
    switch (type) {
      case 'keyword':
        return '#c586c0' // Purple
      case 'string':
        return '#ce9178' // Orange
      case 'comment':
        return '#6a9955' // Green
      case 'number':
        return '#b5cea8' // Light green
      case 'jsx-tag':
        return '#569cd6' // Blue
      case 'jsx-attribute':
        return '#92c5f8' // Light blue
      case 'function':
        return '#dcdcaa' // Yellow
      case 'variable':
        return '#9cdcfe' // Light cyan
      case 'operator':
        return '#d4d4d4' // Light gray
      case 'punctuation':
        return '#d4d4d4' // Light gray
      default:
        return '#d4d4d4' // Default light gray
    }
  }

  const renderHighlightedCode = (code: string, language: string) => {
    const tokens = tokenizeCode(code, language)
    
    return tokens.map((token, index) => {
      if (token.type === 'text') {
        return token.value
      }
      
      return (
        <span 
          key={index} 
          style={{ color: getTokenColor(token.type) }}
        >
          {token.value}
        </span>
      )
    })
  }

  // For bash/shell, use simple highlighting
  const highlightBash = (code: string) => {
    const lines = code.split('\n')
    
    return lines.map((line, lineIndex) => (
      <div key={lineIndex}>
        {line.startsWith('#') ? (
          <span style={{ color: '#6a9955' }}>{line}</span>
        ) : (
          line.replace(/^([a-zA-Z-]+)/, (match) => 
            `<span style="color: #9cdcfe">${match}</span>`
          )
        )}
        {lineIndex < lines.length - 1 && '\n'}
      </div>
    ))
  }

  const renderCode = () => {
    if (language === 'bash' || language === 'shell') {
      return (
        <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap" suppressHydrationWarning>
          {code.split('\n').map((line, index) => (
            <div key={index}>
              {line.startsWith('#') ? (
                <span style={{ color: '#6a9955' }}>{line}</span>
              ) : line.startsWith('npm ') || line.startsWith('cd ') || line.startsWith('mkdir ') ? (
                <>
                  <span style={{ color: '#9cdcfe' }}>{line.split(' ')[0]}</span>
                  <span style={{ color: '#d4d4d4' }}>{line.slice(line.split(' ')[0].length)}</span>
                </>
              ) : (
                <span style={{ color: '#d4d4d4' }}>{line}</span>
              )}
            </div>
          ))}
        </pre>
      )
    }

    return (
      <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap" suppressHydrationWarning>
        {renderHighlightedCode(code, language)}
      </pre>
    )
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
      <div className="p-4 overflow-x-auto bg-[#1e1e1e] text-[#d4d4d4]" suppressHydrationWarning>
        {renderCode()}
      </div>
    </div>
  )
}
