import { useState } from "react";
import { Button, Code, Input, Text } from "@stellar/design-system";
import { useWallet } from "../hooks/useWallet";
import {
  Client as GuessTheNumberClient,
  networks,
} from "../contracts/guess_the_number";
import { Box } from "../components/layout/Box";

export const GuessTheNumber = () => {
  const [guessedIt, setGuessedIt] = useState<boolean>();
  const [theGuess, setTheGuess] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useWallet();

  if (!address) {
    return (
      <Text as="p" size="md">
        Connect wallet to play the guessing game
      </Text>
    );
  }

  const submitGuess = async () => {
    if (!theGuess || !address) return;

    setIsLoading(true);
    try {
      // Create client instance
      const client = new GuessTheNumberClient({
        contractId: networks.standalone.contractId,
        networkPassphrase: networks.standalone.networkPassphrase,
        rpcUrl: "http://localhost:8000/rpc",
      });

      // Call the guess function
      const result = await client.guess({
        a_number: BigInt(theGuess),
        guesser: address,
      });

      // Sign and send the transaction
      const signedResult = await result.signAndSend();

      if (signedResult.result.isErr()) {
        console.error("Transaction failed:", signedResult.result.unwrapErr());
        setGuessedIt(false);
      } else {
        setGuessedIt(signedResult.result.unwrap());
      }
    } catch (error) {
      console.error("Error calling contract:", error);
      setGuessedIt(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void submitGuess();
      }}
    >
      {guessedIt ? (
        <>
          <Text as="p" size="lg">
            You got it!
          </Text>
          <Text as="p" size="lg">
            Set a new number by calling <Code size="md">reset</Code> from the
            CLI as the admin.
          </Text>
        </>
      ) : (
        <Box gap="sm" direction="row" align="end" justify="end" wrap="wrap">
          <Input
            label="Guess a number from 1 to 10!"
            id="guess"
            fieldSize="lg"
            error={guessedIt === false && "Wrong! Guess again."}
            onChange={(e) => {
              setGuessedIt(undefined);
              setTheGuess(Number(e.target.value));
            }}
          />
          <Button
            type="submit"
            disabled={!theGuess || isLoading}
            style={{ marginTop: 8 }}
            variant="primary"
            size="md"
          >
            {isLoading ? "Guessing..." : "Submit Guess"}
          </Button>
        </Box>
      )}
      <Text as="p" size="lg">
        &nbsp; {/* Not sure the SDS way to add consistent spacing at the end */}
      </Text>
    </form>
  );
};
