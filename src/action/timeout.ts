import { Client, Colors, CommandInteraction, EmbedBuilder, GuildMember } from 'discord.js'
import { AsyncDatabase } from 'src/sqlite/sqlite'
import { ILogger } from '../logger/logger'

export default async (client: Client, interaction: CommandInteraction, logger: ILogger, db: AsyncDatabase): Promise<void> => {
  if (!interaction.isRepliable()) {
    logger.logSync('ERROR', 'Gegebene interaction kann nicht beantwortet werden.')
    return
  }

  await interaction.reply({
    embeds: [new EmbedBuilder().setDescription('Timeout fehlgeschlagen')], ephemeral: false
  })
}
