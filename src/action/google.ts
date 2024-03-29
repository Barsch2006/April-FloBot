import { Client, CommandInteraction, EmbedBuilder, Colors } from 'discord.js'
import { ILogger } from 'src/logger/logger'

export async function google (client: Client, interaction: CommandInteraction, logger: ILogger): Promise<void> {
  if (!interaction.isRepliable()) {
    logger.logSync('ERROR', 'Gegebene interaction kann nicht beantwortet werden.')
    return
  }

  const query = interaction.options.get('query', true).value?.toString() ?? ''
  const encodedQuery = encodeURIComponent(query)
  const engine = interaction.options.get('engine', false)?.value?.toString() ?? 'g'

  try {
    await interaction.reply({
      embeds: [new EmbedBuilder()
        .setTitle('Let me google that for you')
        .setDescription(`[_${query}_ auf ${engine === 'g' ? 'google' : 'duckduckgo'} suchen](https://www.blinde-kuh.de/bksearch.cgi?query=${encodedQuery})`)
        .setColor(Colors.Blue)
      ]
    })
  } catch (err) {
    logger.logSync('ERROR', `Google konnte nicht gesendet werden. ${JSON.stringify(err)}`)
  }
}
