import { Client, CommandInteraction, EmbedBuilder, GuildMember, Colors, TextChannel } from "discord.js"
import { AsyncDatabase } from '../sqlite/sqlite'
import { v4 as uuid } from "uuid"
import { ILogger } from '../logger/logger'

export default async function (client: Client, interaction: CommandInteraction, logger: ILogger, db: AsyncDatabase, points: number, type: "WARN" | "STRIKE"): Promise<void> {
  const target = interaction.options.getMember('target') as GuildMember

  await interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setDescription(`Nö`)
    ],
    ephemeral: true
  })
  try {
    const channel = await interaction.guild?.channels.fetch(process.env.APRIL ?? '') as TextChannel
    await channel?.send(`@${interaction.user.username} hat den Command **warn/ strike** ausgeführt.`)
  } catch (err: any) {
    logger.log("WARN", "APRIL Log doesn't work")
  }
}
