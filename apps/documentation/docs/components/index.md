# Components

<ComponentExample 
  title="Button Component" 
  code="<vwc-button variant='primary'>Primary Button</vwc-button>"
  style=":root {
  --vwc-button-primary-bg: #e91e63;
  --vwc-button-primary-text: white;
  --vwc-button-radius: 2rem;
}"
  :editable="true">
    <vwc-button variant="primary">Primary Button</vwc-button>
</ComponentExample>

<ComponentExample 
  title="Input Component" 
  code="<vwc-input label='Username' placeholder='Enter username'></vwc-input>"
  style=":root {
  --vwc-input-border: 2px solid #9c27b0;
  --vwc-input-radius: 1rem;
  --vwc-input-focus-border-color: #673ab7;
  --vwc-input-label-color: #9c27b0;
}"
  :editable="true">
    <vwc-input label="Username" placeholder="Enter username"></vwc-input>
</ComponentExample>

<ComponentExample 
  title="Icon Component" 
  code="<vwc-icon name='star' size='lg' color='#FFD700'></vwc-icon>"
  style=":root {
  --vwc-icon-lg-size: 3rem;
}"
  :editable="true">
    <vwc-icon name="star" size="lg" color="#FFD700"></vwc-icon>
</ComponentExample>

<MarkdownImporter path="README.md" />