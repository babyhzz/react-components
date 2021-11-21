```jsx

import React from 'react';
import moment from 'moment';


<div style={{width: 300}}>
  <BizStepDatePicker picker="date" />
  <BizStepDatePicker picker="week" onChange={v => console.log(v)}/>
  <BizStepDatePicker picker="month" />
  <BizStepDatePicker picker="year" />
</div>
```
