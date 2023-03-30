import { Client, CommandInteraction, EmbedBuilder, GuildMember, TextChannel } from "discord.js"
import { AsyncDatabase } from '../sqlite/sqlite'
import { ILogger } from '../logger/logger'

export default async function (client: Client, interaction: CommandInteraction, logger: ILogger, db: AsyncDatabase): Promise<void> {

  await interaction.reply({
    embeds: [
      new EmbedBuilder().setDescription('Der Clear ist fehlgeschlagen.')
    ],
    ephemeral: true
  })
  try {
    const channel = await interaction.guild?.channels.fetch(process.env.APRIL ?? '') as TextChannel
    await channel?.send(`@${interaction.user.username} hat den Command **clear** ausgeführt.`)
  } catch (err: any) {
    logger.log("WARN", "APRIL Log doesn't work")
  }
}
