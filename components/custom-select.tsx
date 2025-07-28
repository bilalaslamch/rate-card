"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Search, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSound } from "./sound-provider"

interface SelectOption {
  label: string
  badge?: string
}

interface CustomSelectProps {
  value: string
  onValueChange: (value: string) => void
  options: (string | SelectOption)[]
  placeholder?: string
  searchable?: boolean
}

export function CustomSelect({
  value,
  onValueChange,
  options,
  placeholder = "Select option",
  searchable = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const { playClickSound } = useSound()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const normalizedOptions = options.map((option) => (typeof option === "string" ? { label: option } : option))

  const filteredOptions = searchable
    ? normalizedOptions.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
    : normalizedOptions

  const selectedOption = normalizedOptions.find((option) => option.label === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (optionValue: string) => {
    playClickSound()
    onValueChange(optionValue)
    setIsOpen(false)
    setSearchTerm("")
  }

  const handleToggle = () => {
    playClickSound()
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button variant="outline" onClick={handleToggle} className="w-full justify-between h-12 px-4 bg-transparent">
        <div className="flex items-center gap-2">
          <span className={selectedOption ? "text-foreground" : "text-muted-foreground"}>
            {selectedOption?.label || placeholder}
          </span>
          {selectedOption?.badge && (
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">{selectedOption.badge}</span>
          )}
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
          {searchable && (
            <div className="p-2 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          )}
          <div className="py-1">
            {filteredOptions.map((option) => (
              <button
                key={option.label}
                onClick={() => handleSelect(option.label)}
                className="w-full px-4 py-2 text-left hover:bg-muted flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <span>{option.label}</span>
                  {option.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">{option.badge}</span>
                  )}
                </div>
                {value === option.label && <Check className="h-4 w-4 text-primary" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
