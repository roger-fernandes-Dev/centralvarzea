import nodemailer from "nodemailer"

export async function POST(req: Request) {
  const { nome, email, mensagem } = await req.json()

  try {
    // 🔧 transporte mais confiável
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // 🧪 verifica conexão com o Gmail
    await transporter.verify()
    console.log("Servidor de email pronto")

    const info = await transporter.sendMail({
      from: `"Contato Site" <${process.env.EMAIL_USER}>`,
      to: "centralvarzea@gmail.com",
      subject: `Nova mensagem de ${nome}`,
      text: `
Nome: ${nome}
Email: ${email}

Mensagem:
${mensagem}
      `,
    })

    console.log("Email enviado:", info)

    return Response.json({ message: "Mensagem enviada com sucesso!" })

  } catch (error) {
    console.error("Erro ao enviar email:", error)

    return Response.json(
      { message: "Erro ao enviar mensagem" },
      { status: 500 }
    )
  }
}