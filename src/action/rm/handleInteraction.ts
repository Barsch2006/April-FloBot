import { AsyncDatabase } from './../../sqlite/sqlite';
import { Client, CommandInteraction, CommandInteractionOptionResolver } from "discord.js";
import LogManager from "src/logger/logger";
import rename from './slashCommands/rename';
import unban from './slashCommands/unban';
import ban from './slashCommands/ban';
import kick from './slashCommands/kick';
import warn from './slashCommands/warn';
import clearHistory from './slashCommands/clearHistory';
import timeout from './slashCommands/timeout';
import history from './slashCommands/history';

export const handleRMCommands = async (client: Client, interaction: CommandInteraction, logger: LogManager, db: AsyncDatabase): Promise<void> => {
    const options = interaction.options as CommandInteractionOptionResolver
    const subcommand = options.getSubcommand(true)

    switch (subcommand) {
        case 'rename':
            await rename(client, interaction, logger.logger('RM-Rename'))
            return
        case 'unban':
            await unban(client, interaction, logger.logger('RM-unban'))
            return
        case 'ban':
            await ban(client, interaction, logger.logger('RM-ban'), db)
            return
        case 'kick':
            await kick(client, interaction, logger.logger('RM-kick'), db)
            return
        case 'strike':
            await warn(client, interaction, logger.logger('RM-warn-system'), db, 1, "STRIKE")
            return
        case 'warn':
            await warn(client, interaction, logger.logger('RM-warn-system'), db, 0, "WARN")
            return
        case 'clear':
            await clearHistory(client, interaction, logger.logger('RM-clear'), db)
            return
        case 'timeout':
            await timeout(client, interaction, logger.logger('RM-timeout'), db)
            return
        case 'history':
            await history(client, interaction, logger.logger('RM-history'), db)
            return
    }
}
