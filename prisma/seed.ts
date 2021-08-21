import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

const Data: Prisma.SettingsCreateInput[] = [
    {
        name: "main",
        login: "Wilde",
        mainParentIdent: 0,
        password: "1024",
        port: 86,
        ref: "",
        url: "",
        isActive: false,
        selected: true,
    },
]

async function main() {
    console.log(`Start seeding ...`)
    for (const u of Data) {
        const setting = await prisma.settings.create({
            data: u,
        })
        console.log(`Created user with id: ${setting.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
