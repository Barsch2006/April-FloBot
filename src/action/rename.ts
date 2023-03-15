import { Client, CommandInteraction, EmbedBuilder, Colors, GuildMember } from 'discord.js'
import { ILogger } from 'src/logger/logger'
import { randomInt } from 'crypto'
import { nicknames, adjectives, colors } from './rename-names'

const caseCorrectAndRemoveSpaces = (input: string): string => {
  return (input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()).replace(/ /g, '')
}

export default async function rename (client: Client, interaction: CommandInteraction, logger: ILogger): Promise<void> {
  const user = interaction.options.getMember('target') as GuildMember
  const userid = user.id

  let dmSucess = false
  try {
    const dm = await client.users.fetch(userid)
    await dm.send({
      embeds: [
        new EmbedBuilder()
          .setTitle('Umbennenung')
          .setDescription('April! April! Jemand hat versucht dich zu trollen!')
          .setColor(Colors.Purple)
      ]
    })
    dmSucess = true
  } catch (e) {
    dmSucess = false
  }
}
