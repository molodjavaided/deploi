import styled from "styled-components";

const ButtonContainer = ({ className, padding, width, children, ...props }) => {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export const Button = styled(ButtonContainer)`
  font-family: var(--font-primary);
  font-size: 1.1rem;
  letter-spacing: 0.2rem;
  padding: ${({ padding = "12px 15px" }) => padding};
  border-radius: 10px;
  border: none;
  width: ${({ width = "100%" }) => width};
  color: var(--color-black);
  cursor: pointer;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-black);
    color: var(--color-silver);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
