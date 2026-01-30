import * as React from "react"
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxTrigger, // them cai nay
} from "@/components/ui/combobox"
import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { options } from "@/lib/data"

/*
tai tren shadcn ve nhe

nhung thay doi tren ban chinh la :
 */
const DataTimeFilter = ({ dataQuery, setdataQuery }) => {
    return (
        <Combobox value={dataQuery} onValueChange={setdataQuery}>
            <ComboboxTrigger asChild>
                <Button
                    size="lg"
                    variant="outline"
                    role="combobox"
                    className="justify-between"
                >
                    {dataQuery
                        ? options.find((option) => option.value === dataQuery)?.label
                        : options[0].label}
                    <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50" />
                </Button>
            </ComboboxTrigger>
            <ComboboxContent className="p-0 w-50">
                <ComboboxEmpty></ComboboxEmpty>
                <ComboboxList>
                    {options.map((item) => (
                        <ComboboxItem key={item.value} value={item.value}>
                            {item.label}
                        </ComboboxItem>
                    ))}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}

export default DataTimeFilter;