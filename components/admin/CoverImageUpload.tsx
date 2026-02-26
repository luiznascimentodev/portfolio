"use client"

import { useState } from "react"
import Image from "next/image"
import { UploadButton } from "@/lib/uploadthing-client"
import { Button } from "@/components/ui/button"
import { ImageIcon, X, Loader2 } from "lucide-react"

interface CoverImageUploadProps {
  value?: string | null
  onChange: (url: string | null) => void
}

export function CoverImageUpload({ value, onChange }: CoverImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  if (value) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-gray-700">
        <div className="relative h-52 w-full">
          <Image
            src={value}
            alt="Imagem de capa"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute right-2 top-2">
          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="h-8 w-8 rounded-full bg-black/60 hover:bg-red-600"
            onClick={() => onChange(null)}
            aria-label="Remover imagem de capa"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center rounded-xl border border-dashed border-gray-700 bg-gray-900 p-8">
      {uploading ? (
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <p className="text-sm">Fazendo upload...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-700 bg-gray-800">
            <ImageIcon className="h-5 w-5 text-gray-500" />
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Clique para fazer upload da imagem de capa
            </p>
            <p className="mt-0.5 text-xs text-gray-600">PNG, JPG, WEBP — máx. 4MB</p>
          </div>
          <UploadButton
            endpoint="coverImage"
            onUploadBegin={() => setUploading(true)}
            onClientUploadComplete={(res) => {
              setUploading(false)
              if (res?.[0]?.ufsUrl) {
                onChange(res[0].ufsUrl)
              }
            }}
            onUploadError={(err) => {
              setUploading(false)
              console.error("Erro no upload:", err.message)
            }}
            appearance={{
              button:
                "bg-primary hover:bg-primary-dark text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors",
              allowedContent: "hidden",
            }}
            content={{
              button: "Escolher imagem",
            }}
          />
        </div>
      )}
    </div>
  )
}
