import { React, styled } from "uebersicht";

export const command = "osascript ./now-playing/script.scpt";

const Backdrop = styled.div`
  background-color: #000;
  height: 100vh;
  position: relative;
  pointer-events: none;
  width: 100vw;
`;

const BackdropImage = styled.img`
  filter: blur(30px);
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
  transform: scale(1.2);
  pointer-events: none;
  width: 100%;
`;

const NowPlaying = styled.div`
  align-items: center;
  color: #f9fafb;
  display: grid;
  font-family: "Inter";
  grid-template-columns: ${({ cover }) => (cover ? "320px 1fr" : "1fr")};
  grid-column-gap: 32px;
  left: 300px;
  position: absolute;
  top: 50vh;
  transform: translateY(-50%);
  width: calc(100vw - 600px);
`;

const Link = styled.a`
  color: rgb(79, 234, 253, 0.5);
  cursor: pointer;
  display: block;
  margin-top: 16px;
`;

const Cover = styled.div`
  position: relative;
`;

const CoverImage = styled.img`
  border-radius: 8px;
  position: relative;
  width: 100%;
  z-index: 1;
`;

const CoverShadow = styled.img`
  filter: blur(20px);
  height: 320px;
  left: 0;
  position: absolute;
  top: 20px;
  transform: scale(0.85);
  width: 100%;
`;

const Metadata = styled.div``;

const Artist = styled.div`
  color: #d1d5db;
  font-size: 20px;
`;

const Track = styled.div`
  font-size: 48px;
  margin-top: 4px;
  font-weight: 900;
`;

const Album = styled.div`
  color: #6b7280;
  font-size: 16px;
  margin-top: 4px;
`;

const Duration = styled.div`
  align-items: center;
  color: #6b7280;
  display: grid;
  font-size: 14px;
  grid-column-gap: 16px;
  grid-template-columns: auto 1fr auto;
  margin-top: 12px;
`;

const ProgressBar = styled.div`
  background-color: hsla(0, 0%, 100%, 0.3);
  border-radius: 4px;
  height: 12px;
`;

const Progress = styled.div`
  background-image: linear-gradient(
    to right,
    rgb(75, 212, 237),
    rgb(79, 234, 253)
  );
  border-radius: 4px;
  height: 100%;
`;

const TrackDuration = styled.button`
  appearance: none;
  background: none;
  border: 0;
  color: #6b7280;
  cursor: pointer;
  font-family: "Inter";
  font-size: 14px;
`;

const addLeadingZero = (v) => (v < 10 ? `0${v}` : v);
const parseSeconds = (s) => parseFloat(s.toString().replace(",", "."));

const parseTime = (seconds) => {
  const parsedSeconds = parseSeconds(seconds);
  const m = Math.floor(parsedSeconds / 60);
  const s = Math.floor(((parsedSeconds / 60) % 1) * 60);

  return `${m}:${addLeadingZero(s)}`;
};

const ProgressDisplay = ({ position, duration }) => {
  const [displayCountdownTime, setCountdownTime] = React.useState(false);
  const parsedDuration = parseSeconds(duration);
  const parsedPosition = parseSeconds(position);
  const progress = `${(parsedPosition / parsedDuration) * 100}%`;

  return (
    <Duration>
      {parseTime(position)}
      <ProgressBar>
        <Progress style={{ width: progress }} />
      </ProgressBar>
      <TrackDuration onClick={() => setCountdownTime(!displayCountdownTime)}>
        {displayCountdownTime
          ? `-${parseTime(duration - position)}`
          : parseTime(duration)}
      </TrackDuration>
    </Duration>
  );
};

export const render = ({ output, error }) => {
  if (error) {
    console.log(error);
    return null;
  }

  const [
    state,
    artist,
    track,
    album,
    link,
    cover,
    position,
    duration,
  ] = output.split("::");

  if (state !== "playing") {
    return null;
  }

  return (
    <>
      {cover && (
        <Backdrop>
          <BackdropImage src={cover} />
        </Backdrop>
      )}
      <NowPlaying cover={!!cover}>
        {cover && (
          <Cover>
            <CoverImage src={cover} />
            <CoverShadow src={cover} />
          </Cover>
        )}
        <Metadata>
          <Track>{track}</Track>
          <Artist>{artist}</Artist>
          <Album>{album}</Album>
          <ProgressDisplay duration={duration} position={position} />
          {link && <Link href={link}>Spotify</Link>}
        </Metadata>
      </NowPlaying>
    </>
  );
};
