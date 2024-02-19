export interface StepNode {
    name: string
    imgType: "endpoint" | "rect" | "gateway"
    type: string
    img: string
    width: number
    height: number
}