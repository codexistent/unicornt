import type { Pitch } from "../types";

type PitchFormProps = {
  pitch: Pitch | null;
  setPitch: (_pitch: Pitch) => void;
};

export default function PitchForm({ pitch, setPitch }: PitchFormProps) {
  return (
    <>
      {pitch != null && <p>"omg"</p>}{" "}
      <button
        onClick={() => setPitch({ companyName: "owo", text: "ala" })}
      ></button>
    </>
  );
}
