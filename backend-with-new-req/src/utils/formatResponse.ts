export const successResponse = (req: any, res: any, entity: any, code: number, model?: string) => {
    if (!model) {
      return res.status(code).send(
        entity,
      )
    } else {
  
      return res.status(code).send({
        ...entity,
        message: {code, name: model }
      })
    }
  }
  
  export const errorResponse = (req: any, res: any, entity: any, code: number, model?: string) => {
    if (!model) {
      return res.status(code).send({
        data: entity,
      })
    } else {
  
      return res.status(code).send({
        data: entity,
        message:  {code,  name: model }
      })
    }
  }
  
  export const schemaFailResponse = (req: any, res: any, errors: any) => {
    return res.status(400).send({
      message: "bad request",
      errors: errors
    })
  }