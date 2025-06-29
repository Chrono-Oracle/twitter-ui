import { SearchIcon, XIcon } from "lucide-react"

import { FieldGroup } from "@/components/ui/field"
import {
  SearchField,
  SearchFieldClear,
  SearchFieldInput,
} from "@/components/ui/searchfield"

export function SearchFieldDemo() {
  return (
    <SearchField className="w-full">
      <FieldGroup>
        <SearchIcon aria-hidden className="size-4 text-muted-foreground" />
        <SearchFieldInput placeholder="Search Twitter" />
        <SearchFieldClear>
          <XIcon aria-hidden className="size-4" />
        </SearchFieldClear>
      </FieldGroup>
    </SearchField>
  )
}
