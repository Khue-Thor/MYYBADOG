
//This step is required as BigInt is not parseable by JSON, this is the workaround from prisma
//More info at:https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields#serializing-bigint
export async function fixBigInt(object:any){
const parsedObject = JSON.stringify(
    object,
    (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
  )
    const fixedObject = JSON.parse(parsedObject)

    return fixedObject;
}