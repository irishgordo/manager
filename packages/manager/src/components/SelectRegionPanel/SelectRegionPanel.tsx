import * as React from 'react';
import { compose } from 'recompose';
import Paper from 'src/components/core/Paper';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from 'src/components/core/styles';
import Typography from 'src/components/core/Typography';
import RegionSelect, {
  ExtendedRegion,
} from 'src/components/EnhancedSelect/variants/RegionSelect';
import RenderGuard, { RenderGuardProps } from 'src/components/RenderGuard';

type ClassNames = 'root';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3),
      '& svg': {
        '& g': {
          // Super hacky fix for Firefox rendering of some flag icons that had a clip-path property.
          clipPath: 'none !important' as 'none',
        },
      },
    },
  });

interface Props {
  regions: ExtendedRegion[];
  copy?: string;
  error?: string;
  handleSelection: (id: string) => void;
  selectedID?: string;
  disabled?: boolean;
  helperText?: string;
}

const SelectRegionPanel: React.FC<Props & WithStyles<ClassNames>> = (props) => {
  const {
    classes,
    copy,
    disabled,
    error,
    handleSelection,
    helperText,
    regions,
    selectedID,
  } = props;

  if (props.regions.length === 0) {
    return null;
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="h2" data-qa-tp="Region">
        Region
      </Typography>
      {copy && (
        <Typography variant="body1">
          {copy}
          {` `}
          <a
            target="_blank"
            aria-describedby="external-site"
            rel="noopener noreferrer"
            href="https://www.linode.com/speed-test/"
          >
            Use our speedtest page
          </a>
          {` `}
          to find the best region for your current location.
        </Typography>
      )}
      <RegionSelect
        errorText={error}
        disabled={disabled}
        handleSelection={handleSelection}
        regions={regions}
        selectedID={selectedID || null}
        helperText={helperText}
      />
    </Paper>
  );
};

const styled = withStyles(styles);

export default compose<
  Props & WithStyles<ClassNames>,
  Props & RenderGuardProps
>(
  RenderGuard,
  styled
)(SelectRegionPanel);
