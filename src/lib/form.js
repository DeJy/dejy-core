exports.dejyInput = (data, error, attrs) => {

	if (!attrs.name) console.error('Missing attribute name in ' + JSON.stringify(attrs));

	let aname = attrs.name;
	if (aname.includes(',')) {
		aname = aname.split(',')[0].trim();
	}

	return (
		<ion-item lines='full' id={aname}>
			{error[attrs.name] &&
				<ion-label class="ion-text-wrap" style="color:red!important" position="stacked">{attrs.label + ' ' + error[attrs.name]}</ion-label>
			}
			{!error[attrs.name] &&
				<ion-label class="ion-text-wrap" position="stacked">{attrs.label}</ion-label>
			}
			<ion-input
				style="--padding-bottom:4px;--padding-top:4px"
				clear-on-edit="false"
				{...attrs}
				value={data[aname]}
				onchange={(e) => { data[aname] = e.target.value }}
			>
			</ion-input>
		</ion-item>
	)
}