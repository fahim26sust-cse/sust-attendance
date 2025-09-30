'use client';
import FuzzyText from "../../animation/FuzzyText/FuzzyText";

const TitleHeader = ({ text }) => (
  <FuzzyText baseIntensity={0.15} hoverIntensity={0} enableHover={true}>
    {text}
  </FuzzyText>
);
export default TitleHeader;
