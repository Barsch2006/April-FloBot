import { Client, CommandInteraction, EmbedBuilder, GuildMember } from "discord.js"
import { AsyncDatabase } from '../sqlite/sqlite'
import { ILogger } from '../logger/logger'

export default async function (client: Client, interaction: CommandInteraction, logger: ILogger, db: AsyncDatabase): Promise<void> {

  await interaction.reply({
    embeds: [
      new EmbedBuilder().setDescription('Der Clear ist fehlgeschlagen.')
    ],
    ephemeral: true
  })
}
