import { UserNotFoundError } from "./errors";

export const fetchUser = async ({ params }, { userRepository }) => {
  try {
    return {
      body: await userRepository.byId(params.id)
    };
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return {
        status: 400,
        body: {
          message: `User with id ${params.id} not found`
        }
      };
    }

    throw error;
  }
};

export const fetchUsers = async (req, { userRepository, logger }) => {
  const users = await userRepository.all();

  logger.info(`Fetched ${users.length} users`);

  return {
    body: users
  };
};
