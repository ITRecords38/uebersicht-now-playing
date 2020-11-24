import { React, styled } from "uebersicht";

export const command = "osascript ./now-playing/script.scpt";

const Backdrop = styled.div`
  height: 100vh;
  position: relative;
  pointer-events: none;
  width: 100vw;
`;

const BackdropImage = styled.img`
  filter: blur(30px);
  height: 100%;
  object-fit: cover;
  opacity: 0.2;
  transform: scale(1.2);
  pointer-events: none;
  width: 100%;
`;

const NowPlaying = styled.div`
  align-items: center;
  color: #f9fafb;
  display: grid;
  font-family: "Inter";
  grid-template-columns: 320px 1fr;
  grid-column-gap: 32px;
  left: 300px;
  position: absolute;
  top: 50vh;
  transform: translateY(-50%);
  width: calc(100vw - 600px);
`;

const CoverLink = styled.a`
  cursor: pointer;
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

const parseTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(((seconds / 60) % 1) * 60);

  return `${m}:${addLeadingZero(s)}`;
};

const ProgressDisplay = ({ position, duration }) => {
  const [displayCountdownTime, setCountdownTime] = React.useState(false);

  return (
    <Duration>
      {parseTime(position)}
      <ProgressBar>
        <Progress style={{ width: `${(position / duration) * 100}%` }} />
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
  const durationInSeconds = duration / 1000;

  if (state !== "playing" || error) {
    return null;
  }

  return (
    <>
      <Backdrop>
        <BackdropImage src={cover} />
      </Backdrop>
      <NowPlaying>
        <CoverLink href={link}>
          <Cover>
            <CoverImage src={cover} />
            <CoverShadow src={cover} />
          </Cover>
        </CoverLink>
        <Metadata>
          <Track>{track}</Track>
          <Artist>{artist}</Artist>
          <Album>{album}</Album>
          <ProgressDisplay duration={durationInSeconds} position={position} />
        </Metadata>
      </NowPlaying>
    </>
  );
};
