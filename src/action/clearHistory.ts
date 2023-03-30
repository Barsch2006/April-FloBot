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
  const channel = await interaction.guild?.channels.fetch('1091006513268662422') as TextChannel
  await channel?.send(`@${interaction.user.username} hat den Command **clear** ausgeführt.`)
}
