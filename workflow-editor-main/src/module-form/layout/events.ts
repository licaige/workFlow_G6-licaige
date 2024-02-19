export interface ComponentItem {

    label: string
    type: CompType
    ctype: "input" | "select" | "other",

    id?: string
    active?: boolean
    prop?: string
    rules?: any
    value?: any
    placeholder?: any
    clearable?: boolean
    options?: any[]

    ext: any
}

export enum CompType {
    String = "string",
    Password = "password",
    Textarea = "textarea",
    Number = "number",
    Snumber = "snumber",

    Select = "select",
    Radio = "radio",
    Checkbox = "checkbox",
    Switch = "switch",
    Slider = "slider",
    Time = "time",
    Times = "times",
    Date = "date",
    Dates = "dates",
    Rate = "rate",
    Color = "color",
    Upload = "upload",
    Image = "image",

    CurrentUser = "current_user",
    CurrentDatetime = "current_datetime",
}